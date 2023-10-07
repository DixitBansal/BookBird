import axios from "axios";

export async function getBookNameList(search, limit = 5, page = 1) {
  const body = {
    attribute: "bookName",
    search,
    columns: ["bookName"],
    limit,
    page,
  };
  let request = new Request(
    `${process.env.REACT_APP_BASE_URL}/book/getbyattr`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include"
    }
  );
  let response = await fetch(request);
  response = await response.json();
  // console.log("name=", response.result);
  return response;
}

export async function getBookByISBN(ISBN) {
  let response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/book/getbyisbn?ISBN=${ISBN}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }


  );
  response = await response.json();

  console.log(response.result);
  const result = response.result.map((value, index) => {
    value.bookAuthor = JSON.parse(value.bookAuthor);
    return value;
  });
  console.log("data==", result);

  return { ...response, result };
}

export async function getSubjects(search, limit = 5, page = 1) {
  const body = {
    attribute: "subject",
    search,
    columns: ["subject"],
    limit,
    page,
  };
  let request = new Request(
    `${process.env.REACT_APP_BASE_URL}/book/getbyattr`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );
  let response = await fetch(request);
  response = await response.json();
  return response;
}

export async function getPublication(search, limit = 5, page = 1) {
  const body = {
    attribute: "publication",
    search,
    columns: ["publication"],
    limit,
    page,
  };
  let request = new Request(
    `${process.env.REACT_APP_BASE_URL}/book/getbyattr`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );
  let response = await fetch(request);
  response = await response.json();
  return response;
}

export async function getEdition(search, limit, page) {
  const body = {
    attribute: "bookEdition",
    search,
    columns: ["bookEdition"],
    limit,
    page,
  };
  let request = new Request(
    `${process.env.REACT_APP_BASE_URL}/book/getbyattr`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );
  let response = await fetch(request);
  response = await response.json();
  return response;
}

export async function getAuthor(search, limit, page) {
  const body = {
    attribute: "bookAuthor",
    search,
    columns: ["bookAuthor"],
    limit,
    page,
  };
  let request = new Request(
    `${process.env.REACT_APP_BASE_URL}/book/getbyattr`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );
  let response = await fetch(request);
  response = await response.json();
  // response.result = JSON.parse(response.result);
  // console.log("response=", response.result[0].bookAuthor);
  let authorList = JSON.parse(response?.result[0]?.bookAuthor);

  let result = {};
  result = authorList?.map((value, index) => {
    return { ...result, bookAuthor: value };
  });
  // console.log("result=", result);
  response = { ...response, result };
  // console.log("rrr", response);
  return response;
}

export const getURL = async (file, url) => {
  console.log(file)
  let urlResponse = {};
  const myHeaders = new Headers({
    "Content-Type": file.type,
    "x-amz-acl": "public-read",
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: file
  };
  console.log(url);

  return fetch(url, requestOptions)
    .then((response) => {
      if (response) {

        console.log("axios response", response)
        console.log("File uploaded successfully");
        return response;
      } else {
        console.error("Error uploading file");
      }
    })

};

export const getPresignedUrl = (data) => {
  /**
   * @param data : {
   *    fileFormat : "",
   *    type : ""
   * }
   */
  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

      url: `${BASE_URL}/user/pre-signed-url`,
      data,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate presigned URL");
  }
};

export const deletePresignedUrl = (presigned) => {
  const data = {
    presigned
  }
  presigned = String(presigned);

  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

      url: `${BASE_URL}/user/pre-signed-url/delete`,
      data
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate presigned URL");
  }

}

export const getColleges = () => {
  try {
    return axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      url: `/college/getall`,
    });

  } catch (error) {
    console.error(error);
    throw new Error("Failed to get colleges");

  }
}

export const upload = (data) => {
  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      url: `${BASE_URL}/post/register`,
      data
    });

  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload post");

  }
}


