import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import Text from './Text';

const buttonStyles = cva(
  'flex flex-row items-center justify-center space-x-4 p-2',
  {
    variants: {
      variant: {
        primary: 'bg-primaryLight dark:bg-primaryDark',
        secondary: 'bg-secondaryLight dark:bg-secondaryDark',
      },
      rounded: {
        small: 'rounded-sm',
        medium: 'rounded-md',
        full: 'rounded-full',
      },
      size: {
        small: 'py-1',
        medium: 'py-2',
        large: 'py-3',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      rounded: 'small',
      size: 'medium',
      block: false,
    },
  }
);

export interface IButton
  extends VariantProps<typeof buttonStyles>,
    ComponentProps<typeof TouchableOpacity> {
  title: string;
  showLoading?: boolean;
}

const Button: React.FC<IButton> = ({
  title,
  variant,
  block,
  rounded,
  size,
  showLoading = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={buttonStyles({ variant, block, rounded, size })}
      {...props}
    >
      {showLoading && <ActivityIndicator color='#fff' />}
      <Text className='text-lg font-semibold tracking-wide text-white' header>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
