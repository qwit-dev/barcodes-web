import {BarcodeType} from "./models/barcode.ts";
import {useEffect, useState} from "react";
import barcodesJson from './assets/json/barcodes.json';
import Barcode from 'react-barcode';

function App() {
    const [barcodes, setBarcodes] = useState<BarcodeType[]>();
    const [fsBarcode, setFsBarcode] = useState<BarcodeType | null>(null);

    const loadData = async () => {
        var codes: BarcodeType[] = [];

        barcodesJson.barcodes.forEach((barcode: any) => {
            const b = BarcodeType.fromJSON(barcode);

            codes.push(b);
        })

        codes.sort((a, b) => a.name.localeCompare(b.name));

        setBarcodes(codes);
    }

    const findProduct = (query: string): BarcodeType[] => {
        return barcodes?.filter(barcode => barcode.name.toLowerCase().replace(" ", "").includes(query.toLowerCase().replace(" ", ""))) ?? [];
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div id="full-screen-barcode-modal" className="z-50 w-screen h-screen p-[10px] absolute bg-black *:w-full *:h-full" style={{display: fsBarcode == null ? "none" : "block"}} onClick={() => {setFsBarcode(null)}}>
                <Barcode value={fsBarcode?.value ?? ""} format={fsBarcode?.format == "EAN13" ? "EAN13" : (fsBarcode?.format == "UPC-A" ? "UPC" : "EAN8")} />
            </div>
            <div className="flex flex-row items-center justify-between py-[30px] px-[40px]">
                  <p className="text-3xl">Non-DRS Barcodes DB</p>
                  <input type="text" placeholder="Search..." className="p-[10px] rounded-xl outline-none" onChange={(event) => {
                      if (event.target.value === "") {
                          loadData();
                          return false;
                      }
                      setBarcodes(findProduct(event.target.value));
                  }} />
            </div>
            <div className="flex flex-row items-center justify-center h-max flex-wrap gap-[30px] mt-[20px]">
                {
                    barcodes ? barcodes.map((barcode: BarcodeType) => {
                        return (
                            <div key={barcode.id} onClick={() => {setFsBarcode(barcode)}}
                                className="bg-neutral-800 flex flex-col items-center justify-center rounded-3xl p-[20px] cursor-pointer *:rounded-xl" id={barcode.id}>
                                {/*<img src={qr1} alt={barcode.value} className="rounded-xl"/>*/}
                                <Barcode value={barcode.value} format={barcode.format == "EAN13" ? "EAN13" : (barcode.format == "UPC-A" ? "UPC" : "EAN8")} />
                                <p className="text-xl font-bold text-white pt-[10px]">
                                    {barcode.name}
                                </p>
                            </div>
                        )
                    }) : <p>No barcodes were found.</p>
                }
            </div>
        </div>
    )
}

export default App
