import { useCallback, useState } from "react";

interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  avatar?: string | null | undefined;
}

const useRegisterUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setError] = useState<string | null>(null);

  const registerUser = useCallback(
    async (payload: RegistrationPayload): Promise<boolean> => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (response.status !== 201) {
          setError(
            (response.status === 500
              ? "Internal server error"
              : "Something went wrong") + ", please try again later"
          );
          return false;
        }
        return true;
      } catch (error) {
        setError("An error occurred during registration");
        setIsSubmitting(false);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return { registerUser, isSubmitting, isError };
};

export default useRegisterUser;
