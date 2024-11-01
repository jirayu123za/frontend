import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const submitUserInformation = async ({ formData, token }: { formData: FormData, token: string }) => {
    const { data: userInformationResponse } = await axios.post(
        'http://localhost:8000/api/update/profile',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    return userInformationResponse;
};

export const useSubmitUserInformation = () => {
    return useMutation({
        mutationFn: submitUserInformation,
        onSuccess: () => {
            console.log("User information updated successfully");
        },
        onError: (error: any) => {
            console.error("Error submitting user information:", error);
        },
    });
};
