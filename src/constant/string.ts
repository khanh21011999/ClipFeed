export const apiUrl = (page, per_page) => {
  return `https://stg.starzly.io/api/featured-videos?page=${page}&per_page=${per_page}&app=1&new=1`;
};
export const mockItemStoreUrl =
  'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f4ea7019-b9a5-434d-9753-976cae67049b/air-max-97-shoes-6nzBds.png';
export const mockItem = [
  {
    img: 'https://www.pngitem.com/pimgs/m/31-315420_tree-in-autumn-clipart-hd-png-download.png',
  },
  {
    img: 'https://www.citypng.com/public/uploads/preview/-41601314003cc85anibww.png',
  },
  {
    img: 'https://www.drupal.org/files/issues/sample_7.png',
  },
  {
    img: 'https://cutewallpaper.org/24/sample-png/sample-png-download-file-examples-download.png',
  },
];

//  we should use react-navigation but we do not interact so i add this for fast UI
export const mockNav = [
  {
    name: 'Discover',
    iconName: 'compass-outline',
  },
  {
    name: 'Stars',
    iconName: 'planet-outline',
  },
  {
    name: 'Add',
    iconName: 'add',
  },
  {
    name: 'Cart',
    iconName: 'cart-outline',
  },
  {
    name: 'Profile',
    iconName: 'user',
  },
];
export const colors = {
  primary: '#F80C77',
  starYellow: '#F76723',
  green: '#84CA41',
};
