import React, { useEffect, useState } from "react";
import {
  useDisclosure,
  Button,
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase.js";
import "./SignupLogin.css";

export default function Animediscovery() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/watchlist");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/watchlist");
      })
      .catch((err) => alert(err.message));
  };

  const [anime, setAnime] = useState(null);

  const getAnime = () => {
    fetch("https://api.jikan.moe/v4/random/anime")
      .then((response) => response.json())
      .then((data) => {
        setAnime(data.data);
      });
  };

  // I love gil
  useEffect(() => {
    getAnime();
  }, []);

  if (!anime) return null;

  return (
    <div>
      <div>
        <Button right={3} top={1} position="fixed" onClick={onOpen}>
          Login Or Signup <br /> Watchlist
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login Or Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="login-register-container">
                {isRegistering ? (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      value={registerInformation.email}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Confirm Email"
                      value={registerInformation.confirmEmail}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          confirmEmail: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={registerInformation.password}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          password: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={registerInformation.confirmPassword}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <Button
                      colorScheme={"blue"}
                      className="sign-in-register-button"
                      onClick={handleRegister}
                    >
                      Sign up
                    </Button>
                    <button
                      className="create-account-button"
                      onClick={() => setIsRegistering(false)}
                    >
                      Go back
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                    <input
                      type="password"
                      onChange={handlePasswordChange}
                      value={password}
                      placeholder="Password"
                    />
                    <Button
                      colorScheme={"blue"}
                      className="sign-in-register-button"
                      onClick={handleSignIn}
                    >
                      Log In
                    </Button>
                    <button
                      className="create-account-button"
                      onClick={() => setIsRegistering(true)}
                    >
                      Create an account
                    </button>
                  </>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              {/* <Button variant="ghost">Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div>
        <div>
          <center id="ap">
            <Box color="red">Some content may be inappropriate</Box>
            <div>
              <p id="nameTitle">Anime Name: {anime.title}</p>
              {/* <Button
                colorScheme="teal"
                className="buttons"
                onClick={navigator.clipboard.writeText(anime.title)}
              >
                Copy name
              </Button> */}
              <p id="nameTitleEnglish">English Name: {anime.title_english}</p>
              {/* <Button
                colorScheme="teal"
                className="buttons"
                onClick={navigator.clipboard.writeText(anime.title_english)}
              >
                Copy name
              </Button> */}

              <div className="results">
                <div id="ani_result" className="result">
                  <Image
                    padding="3px"
                    id="imgg"
                    src={anime.images.jpg.image_url}
                  />
                </div>
              </div>
            </div>
            <Button colorScheme="blue" onClick={getAnime} id="ani_btn">
              Get Random Anime
            </Button>

            <p></p>
          </center>
        </div>
      </div>
    </div>
  );

  //
  // return (
  // );
}
