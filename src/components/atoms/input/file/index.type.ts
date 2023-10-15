type OmitNativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface InputFileProps extends OmitNativeInputProps {
  onChange?: (file: File) => void;
}