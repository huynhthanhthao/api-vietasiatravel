import { IsOptional, IsString } from 'class-validator';

export class UpdateSetting {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  taxCode: string;

  @IsOptional()
  @IsString()
  fax: string;

  @IsOptional()
  @IsString()
  hotline: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  linkGoogleMap: string;

  @IsOptional()
  sliders: string[];

  @IsOptional()
  vouchers: string[];
}
