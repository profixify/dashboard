import { FormButton } from "@/components/Form/FormButton.tsx";
import { FormInput } from "@/components/Form/FormInput.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Flex } from "antd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Wrapper from "@/core/layouts/Wrapper.tsx";
import { LoginFormData } from "@/pages/Login/types.ts";
import { useLogin } from "@/services/Login.ts";

const Login = () => {
  const { mutateAsync } = useLogin();

  const schema = z.object({
    username: z.string(),
    password: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });
  const submitAction = async (data: LoginFormData) => {
    await mutateAsync(data);
  };

  return (
    <Wrapper>
      <div className="h-screen w-screen bg-slate-100">
        <Flex className="h-full" justify="center" align="center">
          <Card className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 shadow-2xl">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(submitAction)}
            >
              <h1 className="text-xl font-semibold text-center">Login</h1>
              <FormInput
                label="Username"
                name="username"
                control={control}
                error={errors.username}
              />
              <FormInput
                label="Password"
                name="password"
                control={control}
                error={errors.password}
                inputType="password"
              />
              <FormButton errors={errors}>Login</FormButton>
            </form>
          </Card>
        </Flex>
      </div>
    </Wrapper>
  );
};

export default Login;
