"use client";
import React, { useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { SetStateAction, useState } from "react";
import Nav from "../navbar/page";
type Product = {
  id: number;
  name: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};
const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/736x/62/92/44/629244440331e8b72abd8652c443c39c.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/564x/a0/89/72/a08972f11ad0daed9a74d7058c730c26.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://i.pinimg.com/564x/5f/a0/6b/5fa06b6bbc9266662c1cf84c458c83f1.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/736x/da/83/4b/da834b8dff9f73eb4eaeed3ecad39d57.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://t2.genius.com/unsafe/900x0/https%3A%2F%2Fimages.genius.com%2F77b0d1b460d9ba4d1388aad0722a8188.1000x1000x1.png",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 6,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://static.qobuz.com/images/covers/ca/xu/yacrh5ul5xuca_600.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 7,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/9d/d4/ed/9dd4ed60606cb198770feb1229b9ee57.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 8,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/25/ea/27/25ea271daa74cd3ecb500d6fbe3b5897.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 9,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/736x/62/92/44/629244440331e8b72abd8652c443c39c.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 10,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/564x/a0/89/72/a08972f11ad0daed9a74d7058c730c26.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 11,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://i.pinimg.com/564x/5f/a0/6b/5fa06b6bbc9266662c1cf84c458c83f1.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 12,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/736x/da/83/4b/da834b8dff9f73eb4eaeed3ecad39d57.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 13,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://t2.genius.com/unsafe/900x0/https%3A%2F%2Fimages.genius.com%2F77b0d1b460d9ba4d1388aad0722a8188.1000x1000x1.png",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 14,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://static.qobuz.com/images/covers/ca/xu/yacrh5ul5xuca_600.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 15,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/9d/d4/ed/9dd4ed60606cb198770feb1229b9ee57.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 16,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/25/ea/27/25ea271daa74cd3ecb500d6fbe3b5897.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  const productsRef = useRef<HTMLHeadingElement>(null);

  const handleAlbumClick = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
      <Nav />
      <div className="min-h-full">
        <header className="bg-white shadow"></header>
        <main>
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden"></div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
              <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                  <div className="lg:max-w-lg">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white mt-20 text-gray-700 ">
                      Album Sphere
                    </h1>

                    <p className="mt-6 text-xl/8 text-gray-700">
                      is a website that collects and presents information on the
                      sale of music albums from various artists across different
                      genres, featuring both new releases and rare albums. It
                      allows music fans to easily choose and purchase their
                      favorite albums, along with reviews from real users.
                    </p>
                  </div>
                </div>
              </div>
              <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <img
                  className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                  src="album.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-14"></div>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-xl/8 text-gray-700">Products</h1>
            <hr className="mt-6"></hr>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <a
                  onClick={() => handleProductClick(product)}
                  key={product.id}
                  href={product.href}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 mt-6">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </a>
              ))}

              {selectedProduct && (
                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-10"
                >
                  <div
                    className="fixed inset-0 bg-black/5"
                    aria-hidden="true"
                  />

                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={selectedProduct.imageSrc}
                          alt={selectedProduct.imageAlt}
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                          {selectedProduct.name}
                        </Dialog.Title>
                        <p className="mt-2 text-sm text-gray-500">
                          {selectedProduct.price}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          This is a brief description of the product.
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to bag
                        </button>
                      </div>
                    </Dialog.Panel>
                  </div>
                </Dialog>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
