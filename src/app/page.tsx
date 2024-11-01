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
import { Button, Card } from "@mantine/core";
import Nav from "./components/nav/Navbar";
import { FooterCentered } from "../app/components/footer/FooterCentered";
import { useProducts } from "./hook/useProducts";

type Product = {
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products = [], isLoading, error } = useProducts();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <>
      <Nav />
      <div className="min-h-full">
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
                    <button
                      type="button"
                      onClick={handleScroll}
                      className="mt-7 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      SHOPPING NOW
                    </button>
                  </div>
                </div>
              </div>
              <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <img
                 className="w-[30rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[40rem]"
                  src="album.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-14"></div>
          <div className="mx-auto max-w-7xl px-4 py-6">
            <h1 ref={sectionRef} className="text-xl text-gray-700">
              Products
            </h1>
            <hr className="mt-6" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.isArray(products) &&
                products.map((product) => (
                  <Card
                    key={product.product_id}
                    shadow="xs"
                    className="cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-500">{product.price} Bath</p>
                      <p className="text-gray-500">Quantity: {product.quantity}</p>
                    </div>
                  </Card>
                ))}

              {selectedProduct && (
                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-10"
                >
                  <div className="fixed inset-0 bg-black/5" aria-hidden="true" />
                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={selectedProduct.image_url}
                          alt={selectedProduct.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {selectedProduct.name}
                        </Dialog.Title>
                        <p className="mt-2 text-sm text-gray-500">
                          {selectedProduct.price} Bath
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {selectedProduct.description}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          className="bg-indigo-600 text-white px-8 py-3 rounded-md"
                        >
                          Add to Card
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
      <FooterCentered />
    </>
  );
}
