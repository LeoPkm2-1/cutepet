export function hourFormat(hour?: number | string) {
  hour = +(hour ?? 0);
  if (hour === 12) {
    return hour + 'PM';
  }
  if (hour > 12) {
    return hour - 12 + 'PM';
  }
  return hour + 'AM';
}

export function timeFormat(hour?: number | string) {
  hour = +(hour ?? 0);
  if (hour === 12) {
    return hour + ':00 PM';
  }
  if (hour > 12) {
    return hour - 12 + ':00 PM';
  }
  return hour + ':00 AM';
}
