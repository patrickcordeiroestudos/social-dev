import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { CardUser, ButtonSalvar, ButtonEditar, ButtonCancelar } from "./style";
import { useForm } from "react-hook-form";
import api from "../../server/api";
import { toast } from "react-toastify";
import { IRegisterPerson as IRegisterPersonComplete } from "../ModalRegister/ModalRegister";

export default function CardUsuario() {
  const {
    user,
    setIsLogin,
    isInstitution,
    isVolunteer,
    setIsInstitution,
    setIsVolunteer,
  } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  console.log(user);

  const { register, handleSubmit } = useForm<IRegisterPersonComplete>();

  useEffect(() => {
    const type = localStorage.getItem("@type");

    if (type !== undefined) {
      if (type === "institution") {
        setIsVolunteer(false);
        setIsInstitution(true);
      } else {
        setIsInstitution(false);
        setIsVolunteer(true);
      }
    }
  }, []);

  const onSubmitForm = (data: IRegisterPersonComplete) => {
    const type = localStorage.getItem("@type");

    if (type === "institution") {
      setIsVolunteer(false);
      setIsInstitution(true);

      api.patch("/register/institution/profile", data).then((res) => {
        if (res.status === 200) {
          toast.success("Usuário atualizado com sucesso!", {
            autoClose: 1500,
          });
          setTimeout(() => {
            setIsLogin(true);
            setSave(false);
          }, 2000);
        } else {
          toast.error("Ops, algo deu errado", { autoClose: 1500 });
        }
      });
    } else {
      setIsInstitution(false);
      setIsVolunteer(true);
      api.patch("/volunteers/profile", data).then((res) => {
        console.log(data);
        if (res.status === 200) {
          toast.success("Usuário atualizado com sucesso!", {
            autoClose: 1500,
          });
          setTimeout(() => {
            setIsLogin(true);
            setSave(false);
          }, 2000);
        } else {
          toast.error("Ops, algo deu errado", { autoClose: 1500 });
        }
      });
    }
  };

  return (
    <CardUser>
      <div>
        <h3>Meus dados</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {save ? (
            <ButtonEditar onClick={() => setSave(true)} disabled>
              Editar
            </ButtonEditar>
          ) : (
            <ButtonEditar onClick={() => setSave(true)}>Editar</ButtonEditar>
          )}
          {isInstitution && (
            <>
              Nome Instituição:{" "}
              <input
                type="text"
                placeholder={user.name === "" ? "Não informado" : user.name}
                readOnly={!save && true}
                {...register("name")}
              />
              CNPJ:{" "}
              <input
                type="text"
                placeholder={user.cnpj === "" ? "Não informado" : user.cnpj}
                readOnly={!save && true}
                {...register("cnpj")}
              />
              Endereço:{" "}
              <input
                type="text"
                placeholder={
                  user.address === "" ? "Não informado" : user.address
                }
                readOnly={!save && true}
                {...register("address")}
              />
              Telefone:{" "}
              <input
                type="text"
                placeholder={user.phone === "" ? "Não informado" : user.phone}
                readOnly={!save && true}
                {...register("phone")}
              />
              Email:{" "}
              <input
                type="text"
                placeholder={user.email === "" ? "Não informado" : user.email}
                readOnly={!save && true}
                {...register("email")}
              />
            </>
          )}{" "}
          {isVolunteer && (
            <>
              Nome Voluntário:{" "}
              <input
                type="text"
                placeholder={user.name === "" ? "Não informado" : user.name}
                readOnly={!save && true}
                {...register("name")}
              />
              Idade:{" "}
              <input
                type="text"
                placeholder={user.age === "" ? "Não informado" : user.age}
                readOnly={!save && true}
                {...register("age")}
              />
              CPF:{" "}
              <input
                type="text"
                placeholder={user.cpf === "" ? "Não informado" : user.cpf}
                readOnly={!save && true}
                {...register("cpf")}
              />
              Telefone:{" "}
              <input
                type="text"
                placeholder={
                  user.telephone === "" ? "Não informado" : user.telephone
                }
                readOnly={!save && true}
                {...register("phone")}
              />
              Email:{" "}
              <input
                type="text"
                placeholder={user.email === "" ? "Não informado" : user.email}
                readOnly={!save && true}
                {...register("email")}
              />
            </>
          )}
          {save && (
            <div>
              <ButtonSalvar type="submit" className="save">
                Salvar
              </ButtonSalvar>

              <ButtonCancelar onClick={() => setSave(false)}>
                Cancelar
              </ButtonCancelar>
            </div>
          )}
        </form>
      </div>
    </CardUser>
  );
}
