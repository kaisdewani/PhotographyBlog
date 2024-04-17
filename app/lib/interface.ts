// Define the interface for an Image
// Define the interface for the asset linked to an image
interface IImageAsset {
  _id: string;
  url: string;
}

// Define the interface for an image, which includes the asset
interface IImage {
  asset: IImageAsset;
}

// Define the interface for the 'homepagePictures' document type
export interface IHomepagePictures {
  title: string;
  images: IImage[];
}

export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
}

export interface AlbumImage {
  imageUrl: string; // Assuming images[0].asset->url returns a string URL
  eventName: string;
}

// This could be an array of AlbumImage objects
export interface AlbumData {
  slug: any;
  eventName: string;
  imageUrl: string;
}
