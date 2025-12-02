import { FormikState } from 'formik';
import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import * as Yup from 'yup';

const NUMBER_OF_FIELDS = 6;
const isNumeric = (value: string) => /^-?\d+$/.test(value);

const isValidInput = (value: string): boolean => {
  if (!isNumeric(value)) {
    return false;
  }
  return true;
};

const validateOtp = async (otpValue: string, setFieldError: (field: string, message: string | undefined) => void) => {
  const schema = Yup.string()
    .matches(/^[0-9]*$/, 'Only digits are allowed')
    .required('Please fill in all OTP fields before submitting')
    .length(6, `OTP must be exactly 4 characters long`);

  try {
    if (otpValue.length === NUMBER_OF_FIELDS) {
      await schema.validate(otpValue);
      setFieldError('otp', undefined);
    }
  } catch (e) {
    if (e instanceof Yup.ValidationError) {
      setFieldError('otp', e.message);
    }
  }
};

const useOtp = ({
  onChange,
  setFieldTouched,
  setFieldError,
  resetForm,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldTouched: (field: string, isTouched: boolean, shouldValidate?: boolean) => void;
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            otp: string;
          }>
        >
      | undefined
  ) => void;
}) => {
  const [digits, setDigits] = useState<string[]>(new Array(NUMBER_OF_FIELDS).fill(''));
  const digitInputRef = useRef<HTMLInputElement[]>([]);
  const [isUserTyping, setIsUserTyping] = useState<boolean | false>(false);

  const onInputChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!isUserTyping) {
      setIsUserTyping(true);
    }
    setFieldTouched('otp', true);

    let newDigitsArr = [...digits];
    newDigitsArr[index] = target.value.slice(-1);
    setDigits(newDigitsArr);

    const isOtpComplete = newDigitsArr.every((value) => value.length === 1);
    if (isOtpComplete) {
      onChange({
        target: {
          name: 'otp',
          value: newDigitsArr.join(''),
        },
      } as ChangeEvent<HTMLInputElement>);
    }

    if (target.value.slice(-1).length === 1 && isValidInput(target.value.slice(-1))) {
      setFieldError('otp', undefined);

      if (index < NUMBER_OF_FIELDS - 1) {
        digitInputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (index > 0) {
        if (digits[index] === '') {
          const otps = [...digits];
          otps[index - 1] = '';
          setDigits(otps);
          onChange({
            target: {
              name: 'otp',
              value: otps.join(''),
            },
          } as ChangeEvent<HTMLInputElement>);
          digitInputRef.current[index - 1].focus();
        } else {
          const otps = [...digits];
          otps[index] = '';
          setDigits(otps);
        }
        digitInputRef.current[index - 1].focus();
      } else {
        const otps = [...digits];
        otps[index] = '';
        setDigits(otps);
      }
      // if (digits[index] === '' && index > 0) {
      //
      //   const otps = [...digits];
      //   otps[index - 1] = '';
      //   setDigits(otps);
      //   onChange({
      //     target: {
      //       name: 'otp',
      //       value: otps.join(''),
      //     },
      //   } as ChangeEvent<HTMLInputElement>);
      //   digitInputRef.current[index - 1].focus();
      // } else {
      //
      //   const otps = [...digits];
      //   otps[index] = '';
      //   setDigits(otps);
      // }
    }
  };

  const onClick = (index: number) => (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    e.preventDefault();
    if (index > 0 && !target.value) {
      digitInputRef.current[index].blur();
    }
  };

  // const handleKeyPress = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     const isOtpCompleted = digits.every((value) => value !== '');
  //     if (isOtpCompleted) {
  //
  //     } else {
  //       setFieldError('otp', 'Please fill in all OTP fields before submitting.');
  //     }
  //     // if (target.value && index < NUMBER_OF_FIELDS - 1) {

  //     // digitInputRef.current[index + 1].focus();
  //     // }
  //   }
  // };

  useEffect(() => {
    const otpOvalue = digits.join('');
    if (isUserTyping) {
      validateOtp(otpOvalue, setFieldError);
    } else {
      // setFieldError('otp', undefined);
    }
  }, [isUserTyping, digits, setFieldError]);

  useEffect(() => {
    if (digitInputRef.current[0]) {
      digitInputRef.current[0].focus();
      setFieldTouched('otp', true);
      resetForm();
    }
  }, [setFieldTouched, resetForm]);
  return { handleKeyDown, onInputChange, onClick, digits, digitInputRef };
};

export { useOtp };
