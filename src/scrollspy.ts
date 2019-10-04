/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export interface ScrollSpyItemOptions {
  el: HTMLElement;
  callback: () => void;
  offset?: number;
  reference?: ScrollSpyItemReference;
}

export type ScrollSpyItemReference = "top" | "bottom";

export type ScrollSpyCallback = () => void;

export interface ScrollSpyItem extends ScrollSpyItemOptions {
  offset: number;
  reference: ScrollSpyItemReference;
  pos: number;
}

let items: ScrollSpyItem[] = [];
let winHeight: number;
let docHeight: number;

export function clean(): void {
  items = [];
}

export function getItems(): readonly (Readonly<ScrollSpyItem>)[] {
  return items.map(i => i);
}

export function add(param: ScrollSpyItemOptions): void {
  if (!param.el) {
    throw new Error("[@globocom/scrollspy] item.el is required");
  }
  const item: ScrollSpyItem = Object.assign(
    { offset: 200, reference: "top", pos: 0 },
    param
  );
  item.pos = getElementPos(item);

  const index = items.findIndex(i => i.pos > item.pos);

  items.splice(index === -1 ? items.length : index, 0, item);

  if (items.length === 1) {
    setDefaultVariables();
    startListener();
  }
  checkVisibleItems();
}

export function debug(): ScrollSpyItem[] {
  items.forEach((item, i) => {
    const color = i % 2 ? "red" : "blue";
    const border = `2px dashed ${color}`;
    const nodeHtml = document.createElement("div");
    const css = [
      `top: ${item.pos};`,
      "width: 100%;",
      "position: absolute;",
      `border-top: ${border};`
    ].join("");

    item.el.style.border = border;

    nodeHtml.className = "debug-line";
    nodeHtml.setAttribute("style", css);
    document.body.appendChild(nodeHtml);
  });
  return items;
}

function throttle(callback: ScrollSpyCallback): () => void {
  let idle = true;
  return () => {
    if (idle) {
      callback();
      idle = false;
      setTimeout(() => (idle = true), 150);
    }
  };
}

function getElementPos(item: ScrollSpyItem): number {
  const top = getScrollY();
  const boundClient = item.el.getBoundingClientRect();
  return boundClient[item.reference] + top - item.offset;
}

function getScrollY(): number {
  if (typeof pageYOffset !== "undefined") {
    return pageYOffset;
  } else {
    let doc = document.documentElement;
    doc = doc.clientHeight ? doc : document.body;
    return doc.scrollTop;
  }
}

function onResize(): void {
  throttle(() => {
    if (winHeight !== window.innerHeight) {
      resetElementPosition();
    }
  });
}

function onScroll(): void {
  checkDocumentHeight();
  checkVisibleItems();
}

function startListener(): void {
  window.addEventListener("scroll", throttle(onScroll));
  window.addEventListener("resize", throttle(onResize));
}

function stopListeners(): void {
  window.removeEventListener("scroll", throttle(onScroll));
  window.removeEventListener("resize", throttle(onResize));
}

function resetElementPosition(): void {
  winHeight = window.innerHeight;
  for (const item of items) {
    item.pos = getElementPos(item);
  }
  checkVisibleItems();
}

function setDefaultVariables(): void {
  winHeight = window.innerHeight;
  docHeight = document.body ? document.body.offsetHeight : 0;
}

function checkDocumentHeight(): void {
  const currentDocHeight = document.body.offsetHeight;
  if (docHeight !== currentDocHeight) {
    docHeight = currentDocHeight;
    resetElementPosition();
  }
}

function checkVisibleItems(): void {
  const currentPos = getScrollY();
  const currentPosOffset = winHeight + currentPos;
  for (const item of items) {
    if (currentPosOffset >= item.pos) {
      if (item.callback) {
        item.callback();
      }
      items.shift();
    } else {
      break;
    }
  }
  if (!items.length) {
    stopListeners();
  }
}
