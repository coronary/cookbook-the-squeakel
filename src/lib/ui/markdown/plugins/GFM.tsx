import {
  combineExtensions,
  combineHtmlExtensions,
} from "micromark-util-combine-extensions";
import { gfmFootnote, gfmFootnoteHtml } from "micromark-extension-gfm-footnote";
import {
  gfmStrikethrough,
  gfmStrikethroughHtml,
} from "micromark-extension-gfm-strikethrough";
import { gfmTable, gfmTableHtml } from "micromark-extension-gfm-table";
import { gfmTagfilterHtml } from "micromark-extension-gfm-tagfilter";
import {
  gfmTaskListItem,
  gfmTaskListItemHtml,
} from "micromark-extension-gfm-task-list-item";

import {
  gfmFootnoteFromMarkdown,
  gfmFootnoteToMarkdown,
} from "mdast-util-gfm-footnote";
import {
  gfmStrikethroughFromMarkdown,
  gfmStrikethroughToMarkdown,
} from "mdast-util-gfm-strikethrough";
import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table";
import {
  gfmTaskListItemFromMarkdown,
  gfmTaskListItemToMarkdown,
} from "mdast-util-gfm-task-list-item";

export default function remarkGfm(options = {}) {
  // @ts-ignore
  const data = this.data();

  add("micromarkExtensions", gfm(options));
  add("fromMarkdownExtensions", gfmFromMarkdown());
  add("toMarkdownExtensions", gfmToMarkdown(options));

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field, value) {
    const list /** @type {unknown[]} */ =
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = []);

    list.push(value);
  }
}

export function gfm(options) {
  return combineExtensions([
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable,
    gfmTaskListItem,
  ]);
}

export function gfmHtml(options) {
  return combineHtmlExtensions([
    gfmFootnoteHtml(options),
    gfmStrikethroughHtml,
    gfmTableHtml,
    gfmTagfilterHtml,
    gfmTaskListItemHtml,
  ]);
}

export function gfmFromMarkdown() {
  return [
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown,
    gfmTableFromMarkdown,
    gfmTaskListItemFromMarkdown,
  ];
}

export function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmFootnoteToMarkdown(),
      gfmStrikethroughToMarkdown,
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown,
    ],
  };
}
