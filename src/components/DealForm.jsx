"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dealHandler } from "@/lib/Handler/dealHandler";
import { toast } from "react-hot-toast"; // Import toast and Toaster
import validator from "validator"; // Import validator for input validation

const DealForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Validate inputs
    const name = formData.get("name");
    const link = formData.get("link");
    const couponcode = formData.get("couponcode");
    const discount = formData.get("discount");

    if (!validator.isAlphanumeric(name.replace(/\s/g, "")) || name.length < 5) {
      toast.error("Invalid name");
      return;
    }
    if (!validator.isURL(link)) {
      toast.error("Invalid link");
      return;
    }
    if (!validator.isAlphanumeric(couponcode) || couponcode.length < 5) {
      toast.error("Invalid coupon code");
      return;
    }
    if (!validator.isInt(discount, { min: 1, max: 100 })) {
      toast.error("Invalid discount");
      return;
    }

    const response = await dealHandler(formData);
    if (response.success) {
      toast.success(response.message);
      event.target.reset(); // Reset the form after successful submission
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-1/2">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div>
            <Label htmlFor="name" className="block">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 rounded-md text-gray-900"
              required
              minLength={5}
            />
          </div>
          <div>
            <Label htmlFor="link" className="block">
              Link (must start with https://)
            </Label>
            <Input
              type="text"
              id="link"
              name="link"
              className="w-full p-2 rounded-md text-gray-900"
              required
              pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
              title="Please enter a valid url"
            />
          </div>
          <div>
            <Label htmlFor="couponcode" className="block">
              Coupon Code
            </Label>
            <Input
              type="text"
              id="couponcode"
              name="couponcode"
              className="w-full p-2 rounded-md text-gray-900"
              required
              minLength={5}
            />
          </div>
          <div>
            <Label htmlFor="discount" className="block">
              Discount (in %)
            </Label>
            <Input
              type="number"
              id="discount"
              name="discount"
              className="w-full p-2 rounded-md text-gray-900"
              defaultValue={10}
              min={1}
              max={100}
              required
            />
          </div>

          <button
            className="bg-white text-black rounded-md  px-4 py-2 hover:bg-black hover:text-white w-1/4 self-center "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealForm;
