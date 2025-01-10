/**
 * Schema for producing downloader forms.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { FormFieldDef } from "@/components/common/Form/types";
import {
  getBalanceEndpoint,
  getCashflowEndpoint,
  getHistoryEndpoint,
  getIncomeEndpoint,
  getMetainfoEndpoint,
  getNewsEndpoint,
  getSECEndpoint,
  getTagsEndpoint,
  getTodayEndpoint,
} from "@/utils/endpoints";
import { DownloaderType } from "@/types";

export const DownloaderEndpoints: Record<
  DownloaderType,
  (form: Record<string, string>) => URL
> = {
  history: form =>
    getHistoryEndpoint(
      form["ticker"],
      form["start date"],
      form["end date"],
      form["period"],
      "plain"
    ),
  intraday: form => getTodayEndpoint(form["ticker"], "plain"),
  income: form => getIncomeEndpoint(form["ticker"], form["type"]),
  cashflow: form => getCashflowEndpoint(form["ticker"], form["type"]),
  balance: form => getBalanceEndpoint(form["ticker"], form["type"]),
  sec: form => getSECEndpoint(form["ticker"], "plain"),
  tags: form => getTagsEndpoint(form["ticker"], "plain"),
  metainfo: form => getMetainfoEndpoint(form["ticker"], "plain"),
  news: form => getNewsEndpoint(form["ticker"], "plain"),
};

export const DownloaderScheme: Record<DownloaderType, FormFieldDef[]> = {
  history: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
    {
      name: "start date",
      type: "date",
      required: false,
    },
    {
      name: "end date",
      type: "date",
      required: false,
    },
    {
      name: "period",
      type: "select",
      required: false,
      options: [
        { label: "1 Day", value: "1d" },
        { label: "5 Day", value: "5d" },
        { label: "1 Month", value: "1mo" },
        { label: "3 Months", value: "3mo" },
        { label: "6 Months", value: "6mo" },
        { label: "1 Year", value: "1y" },
        { label: "2 Years", value: "2y" },
        { label: "5 Years", value: "5y" },
        { label: "10 Years", value: "10y" },
        { label: "Year to Date", value: "ytd" },
        { label: "Maximum", value: "max" },
      ],
    },
  ],
  intraday: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
  ],
  income: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: false,
      options: [
        { label: "Yearly", value: "yearly" },
        { label: "Quarterly", value: "quarterly" },
      ],
    },
  ],
  cashflow: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: false,
      options: [
        { label: "Yearly", value: "yearly" },
        { label: "Quarterly", value: "quarterly" },
      ],
    },
  ],
  balance: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: false,
      options: [
        { label: "Yearly", value: "yearly" },
        { label: "Quarterly", value: "quarterly" },
      ],
    },
  ],
  sec: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
  ],
  tags: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
  ],
  metainfo: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
  ],
  news: [
    {
      name: "ticker",
      type: "text",
      required: true,
    },
  ],
};
