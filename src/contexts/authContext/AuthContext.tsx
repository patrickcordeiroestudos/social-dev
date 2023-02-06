import { ReactNode, createContext, useState, useEffect } from "react";
import { IRegisterPerson } from "../../pages/DashBoard/DashBoard";
import api from "../../server/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

interface IHomelessProps {
  img: string;
  name: string;
  CPF: number;
  age: number;
  state: string;
  lastLocation: string;
  contact: number;
}

interface IUser {
  name: string;
  cnpj: string;
  adress: string;
  contact: string;
  email: string;
  password: string;
}

interface IUserConstext {
  isLogin: boolean;
  isModal: boolean;
  isRegister: boolean;
  homeLess: IRegisterPerson[];
  searchFor: string;
  isNextDisabled: boolean;
  isGoBackDisabled: boolean;
  isInstitution: boolean;
  isVolunteer: boolean;
  setHomeLess: React.Dispatch<React.SetStateAction<IRegisterPerson[]>>;
  setIsVolunteer: (prevState: boolean) => boolean | void;
  setIsRegister: (prevState: boolean) => boolean | void;
  setIsLogin: (prevState: boolean) => boolean | void;
  setIsModal: (prevState: boolean) => boolean | void;
  setIsInstitution: (prevState: boolean) => boolean | void;
  user: IUser | any;
  setSearchFor: React.Dispatch<React.SetStateAction<string>>;
  next(): void;
  goBack(): void;

  search(): void;
  logout(e: any): void;
}

interface IChildrenProps {
  children: ReactNode;
}

const customId = "custom-id-yes";

export const AuthContext = createContext<IUserConstext>({} as IUserConstext);

export default function AuthProvider({ children }: IChildrenProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isGoBackDisabled, setIsGoBackDisabled] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isInstitution, setIsInstitution] = useState(true);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [homeLess, setHomeLess] = useState<IRegisterPerson[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    token ? setIsLogin(true) : setIsLogin(false);
    console.log(`Instituição: ${isInstitution}`);
    console.log(`Voluntário: ${isVolunteer}`);
  }, []);

  function next() {
    api
      .get("database", {
        params: {
          _page: nextPage + 1,
          _limit: 8,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setNextPage(nextPage + 1);
        } else if (res.data.length < 0) {
          setIsNextDisabled(true);
        }
      });
    if (nextPage > 0) {
      setIsGoBackDisabled(false);
    }
  }

  function goBack() {
    api
      .get("database", {
        params: {
          _page: nextPage,
          _limit: 8,
        },
      })
      .then((res) => {
        if (nextPage <= 1) {
          setIsGoBackDisabled(false);
        } else if (nextPage > 1) {
          setIsGoBackDisabled(true);
          setIsNextDisabled(false);
        }
      });
    setNextPage(nextPage - 1);
  }

  function search() {
    api.get("/homeless").then((res) => {
      console.log(res);
      setHomeLess([
        ...res.data.filter((item: any) => item.name.includes(searchFor)),
      ]);
    });

    // api
    //   .get(`database/?name_like=${searchFor}`)
    //   .then((res) => setHomeLess(res.data));
  }

  function logout(e: any) {
    e.preventDefault();
    toast.success("Logout realizado com sucesso!", {
      autoClose: 1500,
      toastId: customId,
    });
    setTimeout(() => {
      // setIsLogin(false);
      // setIsRegister(false);
      setIsLogin(false);
      setUser({});
      localStorage.clear();
      navigate("/home", { replace: true });
    }, 2000);
  }

  useEffect(() => {
    api
      .get("database?_expand=user", {
        params: {
          _page: nextPage,
          _limit: 8,
        },
      })
      .then((res) => {
        setHomeLess(res.data);
      });
  }, [nextPage]);

  useEffect(() => {
    const type = localStorage.getItem("@type");
    const token = localStorage.getItem("@TOKEN");
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    type === "volunteer" &&
      api.get(`/volunteers/profile`).then((res) => {
        console.log(res.data);
        setIsVolunteer(true);
        setIsInstitution(false);
        setUser(res.data);
      });
    type === "institution" &&
      api.get(`/register/institution/profile`).then((res) => {
        console.log(res.data);
        setIsInstitution(true);
        setIsVolunteer(false);
        setUser(res.data);
      });
  }, [isLogin]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isModal,
        homeLess,
        searchFor,
        isNextDisabled,
        isGoBackDisabled,
        isRegister,
        isVolunteer,

        setHomeLess,
        setIsVolunteer,
        setIsRegister,
        setIsLogin,
        setIsModal,
        setSearchFor,
        user,
        goBack,
        next,
        search,
        logout,
        isInstitution,
        setIsInstitution,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
