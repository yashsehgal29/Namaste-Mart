import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { collection } from "firebase/firestore";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center bg-blue-400 border border-transparent h hover:bg-blue-300 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-blue-200">
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name'
                            className='w-full px-2 py-2 border border-transparent rounded-md outline-none h '
                             value={addressInfo.name}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            placeholder='Enter your address'
                            className='w-full px-2 py-2 border border-transparent rounded-md outline-none h '
                            value={addressInfo.address}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            placeholder='Enter your pincode'
                            className='w-full px-2 py-2 border border-transparent rounded-md outline-none h '
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder='Enter your mobileNumber'
                            className='w-full px-2 py-2 border border-transparent rounded-md outline-none h '
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className="">
                    <Button
                type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                }}
                className="w-full px-2 py-2 bg-blue-400 border border-transparent rounded-md outline-none h hover:bg-blue-300 "
            >
                Buy now
            </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;