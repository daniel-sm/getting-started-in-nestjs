import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  ProductCharacteristicsDTO,
  ProductImagesDTO,
} from './create-product.dto';

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  value: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  quantityAvaliable: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicsDTO)
  @IsOptional()
  characteristics: ProductCharacteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImagesDTO)
  @IsOptional()
  images: ProductImagesDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;
}
