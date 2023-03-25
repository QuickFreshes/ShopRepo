import { Image, useTheme } from "@aws-amplify/ui-react";

export function Header() {
  const { tokens } = useTheme();

  return (
    <Image
      alt="logo"
      src="https://quickfreshesawsbucket.s3.ap-south-1.amazonaws.com/Logo.svg"
      padding={tokens.space.medium}
    />
  );
}
