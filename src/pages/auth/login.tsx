import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axios from "axios";
import { getToken } from "src/utils/getToken";

const Page = () => {
  const router = useRouter();
  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "admin@admin.com",
      password: "123456",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth`);

      if (data.length > 0) {
        const success = data.find(
          (auth: any) => auth.email === values.email && auth.password === values.password
        );

        if (success) {
          localStorage.setItem("token", success.token);

          router.push("/");
        } else {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Email or Password Wrong!" });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleMethodChange = useCallback((event: any, value: any) => {
    setMethod(value);
  }, []);

  return (
    <>
      <Head>
        <title>Login | Stockify</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Email" value="email" />
            </Tabs>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>

              {formik.errors.submit && typeof formik.errors.submit === "string" && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}

              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export default Page;
