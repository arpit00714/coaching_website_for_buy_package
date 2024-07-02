import { appuri } from "../appUri/appUri";

export const userdata = async (data) => {
  try {
    const response = `${appuri}studentuser`;
    const resp = await fetch(response, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const updateuserdata = async (data, uid) => {
  try {
    const response = `${appuri}studentuser/update/${uid}`;
    const resp = await fetch(response, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const DeleteDisscount = async (id) => {
  try {
    const response = `${appuri}packagediscount/disablepackagedisscount/${id}`;
    const resp = await fetch(response, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },

    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};


export const getstudentuserdata = async (uid) => {
  try {
    const endpoint = `${appuri}studentbuypacakages/getbuypacakagebyid/${uid}`;
    const response = await fetch(endpoint);
    return response;
  } catch (err) {
    console.log("Err", err);
  }
};

export const generatetoken = async (data) => {
  try {
    const response = `${appuri}generatetoken`;
    const resp = await fetch(response, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};
export const buypacakages = async (data) => {
  try {
    const response = `${appuri}studentbuypacakages`;
    const resp = await fetch(response, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};


export const GetstudentData = async (uid) => {
  try {
    const endpoint = `${appuri}studentuser/getSudentsdata/${uid}`;
    const response = await fetch(endpoint);
    return response;
  } catch (err) {
    console.log("Err", err);
  }
};


export const updateuserConsultancy = async (data, uid) => {
  try {
    const response = `${appuri}studentconsultancy/updateStudentConsultancy/${uid}`;
    const resp = await fetch(response, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return resp;
  } catch (err) {
    console.log("Err", err);
  }
};

export const Userchatbot = async (data) => {
    try {
      const response = `${appuri}chatbot`;
      const resp = await fetch(response, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return resp;
    } catch (err) {
      console.log("Err", err);
    }
  };
