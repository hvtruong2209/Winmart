import axios from "axios";

export const GetAllProvince = async () => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
      },
    };
    const { data } = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, config);
    return data.data;
  } catch (error) {
    return [];
  }
};

export const GetAllDistrict = async (provinceId: string) => {
  const newConfig = {
    headers: {
      Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
    },
    params: {
      province_id: provinceId,
    },
  };
  try {
    const { data } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      newConfig
    );
    return data.data;
  } catch (error) {
    return [];
  }
};

export const GetAllWard = async (districtId: string) => {
  const newConfig = {
    headers: {
      Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
    },
    params: {
      district_id: districtId,
    },
  };
  try {
    const { data } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?${districtId}`,
      newConfig
    );
    return data.data;
  } catch (error) {
    return [];
  }
};
