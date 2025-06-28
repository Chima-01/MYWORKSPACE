import Image from "next/image";

type Props = {
  image: string;
  title: string;
}

const RestaurantCard = ({image, title }: Props) => {
  return (
    <div>
      <Image 
      src={image}
      alt="Image"
      width={400}
      height={400}
      className="w-full h-[250px] object-cover"
      />
      <h1 className="mt-4 w-fit dark:hover:text-amber-300 hover:text-blue-950 transition-all duration-200 cursor-pointer text-base sm:text-lg font-bold">
        {title}
        </h1>
        <div className="flex items-center font-medium mt-3 space-x-2">
          <p className="bg-blue-950 px-3 py-1.5 rounded-full text-sm sm:text-base text-white">American</p>
          <p className="bg-blue-950 px-3 py-1.5 rounded-full text-sm sm:text-base text-white">Fast Food</p>
          <p className="bg-blue-950 px-3 py-1.5 rounded-full text-sm sm:text-base text-white">Burgers</p>
        </div>
    </div>
  )
}

export default RestaurantCard