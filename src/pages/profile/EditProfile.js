import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { BsXLg } from "react-icons/bs";
import CloudinaryUploadWidget from "../../components/CloudinaryUpload";
import { toast } from "react-hot-toast";
import axios from "axios";

const EditProfile = ({ closeModal, getProfile }) => {
  const { user } = useContext(UserContext);
  const [editedUser, setEditedUser] = useState(user);

  const updateUser = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://touter-f228e9b8c7a1.herokuapp.com/api/user/update",
        editedUser,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      toast.success("Changes Saved", {
        id: "profileeditsuccess",
      });
    } catch (error) {
      toast.error("Unable To Edit Profile", {
        id: "cantsavechanges",
      });
    } finally {
      getProfile();
      closeModal((prev) => !prev);
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal narrow">
        <h2>EDIT PROFILE</h2>
        <div className="overlay-container">
          <CloudinaryUploadWidget
            id={"cover-pic"}
            setImg={(img) =>
              setEditedUser((prev) => ({ ...prev, coverPicture: img }))
            }
          />
          <img src={editedUser.coverPicture} alt="cover" className="cover" />
        </div>
        <span className="container-flex">
          <button disabled>
            {editedUser.following.length} <em>following</em>
          </button>
          <div className="overlay-container profile-pic">
            <CloudinaryUploadWidget
              id={"profile"}
              setImg={(img) =>
                setEditedUser((prev) => ({ ...prev, profilePicture: img }))
              }
            />
            <img
              src={editedUser.profilePicture}
              alt="dp"
              className="profile-picture"
            />
          </div>
          <button disabled>
            {editedUser.followers.length} <em>Followers</em>
          </button>
        </span>
        <div className="user-tags">
          <h2>
            <input
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser((prev) => ({ ...prev, name: e.target.value }))
              }
            ></input>
          </h2>
          <p>
            <em>
              @
              <input
                value={editedUser.username}
                onChange={(e) =>
                  setEditedUser((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </em>
          </p>
        </div>

        <p className="bio">
          <em>About Me</em>
          <textarea
            value={editedUser.bio}
            onChange={(e) =>
              setEditedUser((prev) => ({ ...prev, bio: e.target.value }))
            }
          ></textarea>
        </p>

        <p className="links">
          <em>My Link:</em>
          <input
            value={editedUser.links}
            onChange={(e) =>
              setEditedUser((prev) => ({ ...prev, links: e.target.value }))
            }
          ></input>
        </p>

        <button className="submit-edit" onClick={() => updateUser()}>
          SAVE CHANGES
        </button>
        <button className="btn-tr" onClick={() => closeModal((prev) => !prev)}>
          <BsXLg size={"2rem"} />
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
