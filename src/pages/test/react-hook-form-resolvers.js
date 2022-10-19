import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required();

const ReactHookFormResolvers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <dir>
        <p>Name</p>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
      </dir>
      <dir>
        <p>Age</p>
        <input type="number" {...register("age")} />
        {errors.age?.message && <p>{errors.age?.message}</p>}
      </dir>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};
export default ReactHookFormResolvers;
