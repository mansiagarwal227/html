export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
    baseUrl:'./assets/img',
    images: [
      {
        key: 'ground',
        url: 'ground.png',
      },
      {
        key: 'food',
        url: 'apple.png',
      },
      
      {
        key: 'snakehead',
        url:'snakeHead.png',
      }
    ],
};