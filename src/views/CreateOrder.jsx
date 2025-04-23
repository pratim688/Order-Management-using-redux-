import React, { useEffect, useState } from "react";
import { FaUtensils, FaShoppingBag, FaMotorcycle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setDineInData, clearDineInData } from "../slices/dineInSlice";
import { clearTakeawayData, setTakeawayData } from "../slices/takeawaySlice";
import { clearDeliveryData, setDeliveryData } from "../slices/deliverySlice";
import { useNavigate } from "react-router-dom";
// Inside your component

const modalFields = {
  "Dine In": [
    {
      label: "Table Number",
      name: "tableNumber",
      type: "number",
      placeholder: "Enter table number",
    },
    {
      label: "Number of Guests",
      name: "guests",
      type: "number",
      placeholder: "Enter number of guests",
    },
  ],
  Takeaway: [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone",
    },
    { label: "Pickup Time", name: "pickupTime", type: "time", placeholder: "" },
  ],
  Delivery: [
    {
      label: "Delivery Address",
      name: "address",
      type: "text",
      placeholder: "Enter address",
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone",
    },
    {
      label: "Instructions",
      name: "instructions",
      type: "text",
      placeholder: "Any special instructions",
    },
  ],
};

const CreateOrder = () => {
  const orderTypes = [
    {
      name: "Dine In",
      icon: <FaUtensils className="text-4xl text-blue-600" />,
    },
    {
      name: "Takeaway",
      icon: <FaShoppingBag className="text-4xl text-green-600" />,
    },
    {
      name: "Delivery",
      icon: <FaMotorcycle className="text-4xl text-red-600" />,
    },
  ];

  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dineInData = useSelector((state) => state.dineIn);
  const takeawayData = useSelector((state) => state.takeaway);
  const deliveryData = useSelector((state) => state.delivery);
  useEffect(() => {
    if (!selectedType) return;
    const stored =
      selectedType === "Dine In"
        ? dineInData
        : selectedType === "Takeaway"
        ? takeawayData
        : deliveryData;
    setFormData({ ...stored });
  }, [selectedType, dineInData, takeawayData, deliveryData]);
  const openModal = (type) => {
    if (type !== "Dine In") dispatch(clearDineInData());
    if (type !== "Takeaway") dispatch(clearTakeawayData());
    if (type !== "Delivery") dispatch(clearDeliveryData());
    setSelectedType(type);
    setFormData({});
  };

  const closeModal = () => setSelectedType(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (selectedType) {
      case "Dine In":
        dispatch(setDineInData(formData));
        break;
      case "Takeaway":
        dispatch(setTakeawayData(formData));
        break;
      case "Delivery":
        dispatch(setDeliveryData(formData));
        break;
      default:
        break;
    }
    navigate("/create-order/menu-itens");
    console.log(`Submitted ${selectedType} data:`, formData);
    closeModal();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
        {orderTypes.map((type) => (
          <div
            key={type.name}
            onClick={() => openModal(type.name)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            {type.icon}
            <div className="mt-4 text-lg font-semibold">{type.name}</div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedType} Order
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalFields[selectedType].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="mb-1 font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
