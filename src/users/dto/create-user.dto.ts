import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    { message: 'Invalid email format, please provide a valid email address.' },
  )
  @IsNotEmpty({ message: 'Email is required.' })
  username: string;

  @IsString({ message: 'Password must be a string.' }) // Ensures password is a string
  @IsNotEmpty({ message: 'Password is required.' }) // Ensures the field is not empty
  @MinLength(6, { message: 'Password must be at least 6 characters long.' }) // Minimum length validation
  @MaxLength(120, { message: 'Password cannot be longer than 12 characters.' }) // Maximum length validation
  password: string;

  @IsString({ message: 'fname must be a string.' })
  fname: string;

  @IsString({ message: 'lname must be a string.' })
  lname: string;
}
