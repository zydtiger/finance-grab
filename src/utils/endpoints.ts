/**
 * API endpoints declarations.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

type ResponseType = "plain" | "model";

export const getHistoryEndpoint = (
  ticker: string,
  start?: string,
  end?: string,
  period?: string,
  ret_type: ResponseType = "model"
) => {
  const targetURL = new URL(`/api/history/${ticker}`, window.location.origin);
  if (start) targetURL.searchParams.append("start", start);
  if (end) targetURL.searchParams.append("end", end);
  if (period) targetURL.searchParams.append("period", period);
  else targetURL.searchParams.append("period", "5y"); // default: 5 years of history data
  targetURL.searchParams.append("type", ret_type);
  return targetURL;
};

export const getTodayEndpoint = (
  ticker: string,
  ret_type: ResponseType = "model"
) => {
  const targetURL = new URL(`/api/intraday/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", ret_type);
  return targetURL;
};

export const getIncomeEndpoint = (ticker: string, type: string = "yearly") => {
  const targetURL = new URL(`/api/income/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", type);
  return targetURL;
};

export const getCashflowEndpoint = (
  ticker: string,
  type: string = "yearly"
) => {
  const targetURL = new URL(`/api/cashflow/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", type);
  return targetURL;
};

export const getBalanceEndpoint = (ticker: string, type: string = "yearly") => {
  const targetURL = new URL(`/api/balance/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", type);
  return targetURL;
};

export const getSECEndpoint = (
  ticker: string,
  ret_type: ResponseType = "model"
) => {
  const targetURL = new URL(`/api/sec/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", ret_type);
  return targetURL;
};

export const getNewsEndpoint = (
  ticker: string,
  ret_type: ResponseType = "model"
) => {
  const targetURL = new URL(`/api/news/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", ret_type);
  return targetURL;
};

export const getMetainfoEndpoint = (
  ticker: string,
  ret_type: ResponseType = "model"
) => {
  const targetURL = new URL(`/api/metainfo/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", ret_type);
  return targetURL;
};

export const getTagsEndpoint = (
  ticker: string,
  ret_type: ResponseType = "model"
) => {
  const targetURL = new URL(`/api/tags/${ticker}`, window.location.origin);
  targetURL.searchParams.append("type", ret_type);
  return targetURL;
};
