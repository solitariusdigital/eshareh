import { Fragment, useContext, useState, useEffect } from "react";
import { StateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import classes from "./Form.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getUsersApi } from "@/services/api";
import { applyFontToEnglishWords } from "@/services/utility";

export default function Chat() {
  const { languageType, setLanguageType } = useContext(StateContext);

  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersApi();
        let addSelectOption = users.map((user) => ({
          ...user,
          selection: false,
        }));
        setUsers(addSelectOption);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUserSelection = (index, isActive) => {
    setUsers((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, selection: isActive } : item
      )
    );
  };

  return (
    <div className={classes.chatForm}>
      {users?.map((user, index) => {
        return (
          <div
            key={index}
            className={classes.row}
            onClick={() => handleUserSelection(index, !user.selection)}
          >
            <div>
              <h3>{user.name[languageType]}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: applyFontToEnglishWords(
                    user["title"][languageType],
                    "English",
                    "16px",
                    "fa"
                  ),
                }}
              ></p>
            </div>
            {user.selection ? (
              <RadioButtonCheckedIcon className="icon" />
            ) : (
              <RadioButtonUncheckedIcon className="icon" />
            )}
          </div>
        );
      })}
    </div>
  );
}
