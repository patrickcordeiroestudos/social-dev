import { DivBack } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import api from "../../server/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IRegisterPerson {
  name: string;
  age: string;
  cnpj: string;
  cpf: string;
  address: string;
  phone: number;
  email: string;
  password: string;
}

export default function ModalRegister() {
  const {
    setIsRegister,
    isInstitution,
    setIsInstitution,
    isVolunteer,
    setIsVolunteer,
  } = useContext(AuthContext);

  const customId = "custom-id-yes";

  const formSchema = yup.object().shape({
    name: yup.string(),
    cnpj: yup.string(),
    cpf: yup.string(),
    age: yup.string(),
    adress: yup.string(),
    phone: yup.string(),
    email: yup.string().email().required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPerson>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data: IRegisterPerson) => {
    console.log(data);
    !isInstitution
      ? api.post("/register/institution", {
          name: data.name,
          cnpj: data.cnpj,
          address: data.address,
          telephone: data.phone,
          email: data.email,
          password: data.password,
        })
      : api
          .post("/volunteers/register", {
            name: data.name,
            age: data.age,
            cpf: data.cpf,
            email: data.email,
            telephone: data.phone,
            password: data.password,
          })
          .then((res) => {
            if (res.status === 201) {
              toast.success("Registro realizado com sucesso", {
                autoClose: 1500,
                toastId: customId,
              });
              setTimeout(() => setIsRegister(false), 2500);
            }
          })
          .catch((error: any) => {
            toast.error(`Error: ${error.response.data}`);
            console.log(error.response.data);
          });
  };

  return (
    <DivBack>
      <section>
        <h3>Cadastre-se</h3>
        <div id="toggle">
          <button
            className="toggle-buttons"
            id="institution"
            onClick={() => {
              setIsVolunteer(false);
              setIsInstitution(true);
            }}
          >
            Instituição
          </button>
          <button
            className="toggle-buttons"
            id="volunteer"
            onClick={() => {
              setIsInstitution(false);
              setIsVolunteer(true);
            }}
          >
            Voluntário
          </button>
        </div>

        {isInstitution && (
          <>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <label>Nome da instituição</label>
              <input
                type="text"
                placeholder="Digite o nome"
                {...register("name")}
              />

              <label>CNPJ</label>
              <input
                type="text"
                placeholder="Digite o CNPJ Ex: 00.000.000/0000-00"
                {...register("cnpj")}
              />
              {/* {errors.cnpj?.message} */}

              <label>Email</label>
              <input
                type="email"
                placeholder="Digite o email"
                {...register("email")}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite a senha"
                {...register("password")}
              />

              <label>Endereço</label>
              <input
                type="text"
                placeholder="Informe o seu endereço"
                {...register("address")}
              />

              <label>Telefone</label>
              <input
                type="phone"
                placeholder="Digite o seu telefone"
                {...register("phone")}
              />
              <button type="submit" className="register">
                Cadastrar
              </button>
            </form>
          </>
        )}
        {isVolunteer && (
          <>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <label>Nome Voluntário</label>
              <input
                type="text"
                placeholder="Digite o nome"
                {...register("name")}
              />

              <label>CPF</label>
              <input
                type="text"
                placeholder="Digite o CPF Ex: 000.000.000-00"
                {...register("cpf")}
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Digite o email"
                {...register("email")}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite a senha"
                {...register("password")}
              />

              <label>Idade</label>
              <input
                type="text"
                placeholder="Digite sua idade"
                {...register("age")}
              />

              <label>Telefone</label>
              <input
                type="phone"
                placeholder="Digite o seu telefone"
                {...register("phone")}
              />
              <button type="submit" className="register">
                Cadastrar
              </button>
            </form>
          </>
        )}

        <div id="toggleLogin">
          <p>
            Já tem cadastro?{" "}
            <button type="button" onClick={() => setIsRegister(false)}>
              Fazer login
            </button>
          </p>
        </div>

        <ToastContainer />
      </section>
    </DivBack>
  );
}
