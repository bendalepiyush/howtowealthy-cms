export const GA_TRACKING_ID = "G-XW65H565BT";

export const pageview = (url) => {
  window.gtag("config", "TRACKING-ID", {
    page_path: url,
  });
};
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
