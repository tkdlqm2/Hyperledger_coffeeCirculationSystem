import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

export default ({ navigation }) => {
  const data = {
    me: {
      username: "euijin",
      avatar:
        "https://s.gravatar.com/avatar/b5f8dac7526f9ef941d739a78a5ed1fb?d=mm"
    }
  };
  return (
    <ScrollView>
      {/* {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />} */}
      {data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
