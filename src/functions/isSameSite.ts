const isSameSite = (url?: string) => {
  if (!url || url[0] === '#') {
    return true;
  }

  if (url.indexOf('/api/files/') === 0) {
    return false;
  }

  let tmp = url;
  if (process.env.NEXT_PUBLIC_FRONT_URI) {
    tmp =
      tmp.indexOf(process.env.NEXT_PUBLIC_FRONT_URI) === 0
        ? tmp.replace(process.env.NEXT_PUBLIC_FRONT_URI, '')
        : tmp;
  }
  tmp = tmp.replace(/^https?:\/\//gi, '');

  return tmp[0] === '/';
};

export default isSameSite;
