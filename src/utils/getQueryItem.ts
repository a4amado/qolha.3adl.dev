function getQueryItem(q: any) {
  return Array.isArray(q) ? q[0] : q;
}

export default getQueryItem;
