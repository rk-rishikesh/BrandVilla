import { createContext, useContext, useState } from "react";
import { NFTStorage, File } from "nft.storage";

const IPFSContext = createContext({});

export function IPFSContextProvider(props) {
  const [IPFSuploading, setIPFSuploading] = useState(false);
  const [IPFSerror, setIPFSerror] = useState(null);

  async function IPFSupload(data, file) {
    try {
      setIPFSerror(null);
      setIPFSuploading(true);
      const client = new NFTStorage({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYxMjRGNzViYzgwMWE1MmVENTkxQzRBNjVkRWVjMEUxMkVjZTgxRGEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODIwNTU0OTA0MywibmFtZSI6IkJyYW5kVmlsbGEifQ.JDMQvijY7xLoPahhx8RhWkfZBG8gY9c1-EG-gJ259dE"
      });
      console.log(new File([file], file.name, { type: file.type }))
      const metadata = await client.store({
        name: data.name,
        description: data.description,
        image: new File([file], file.name, { type: file.type })
      });
      console.log(metadata);
      return metadata.url;
    } catch (error) {
      console.error(error);
      setIPFSerror(error);
    } finally {
      setIPFSuploading(false);
    }
  }

  async function invoiceUpload(data) {
    try {
      setIPFSerror(null);
      setIPFSuploading(true);
      const client = new NFTStorage({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYxMjRGNzViYzgwMWE1MmVENTkxQzRBNjVkRWVjMEUxMkVjZTgxRGEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODIwNTU0OTA0MywibmFtZSI6IkJyYW5kVmlsbGEifQ.JDMQvijY7xLoPahhx8RhWkfZBG8gY9c1-EG-gJ259dE"
      });
      var file = ""
      const metadata = await client.store({
        name: data.name,
        description: "Invoice generated by BrandVilla",
        details: {
          orderDate: data.today,
          shippingAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            emailID: data.emailID,
            contactNumber: data.contactNumber,
            address: data.address,
            city: data.city,
            country: data.country,
            postalCode: data.postalCode
          },
          totalCost: data.totalCost
        },
        image: new File([file], file.name, { type: file.type })
      });

      console.log(metadata);
      return metadata.url;
    } catch (error) {
      console.error(error);
      setIPFSerror(error);
    } finally {
      setIPFSuploading(false);
    }
  }

  return (
    <IPFSContext.Provider value={{ IPFSuploading, IPFSerror, IPFSupload, invoiceUpload }}>
      {props.children}
    </IPFSContext.Provider>
  );
}

export function useIPFS() {
  return useContext(IPFSContext);
}
