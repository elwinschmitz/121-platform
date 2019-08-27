import { ApiModelProperty } from '@nestjs/swagger';
import {
  Length,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';

export class PrefilledAnswerDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  public readonly attributeId: number;
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  public readonly attribute: string;
  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  public readonly answer: number;
}

export class PrefilledAnswersDto {
  @ApiModelProperty({ example: 'did:sov:2wJPyULfLLnYTEFYzByfUR' })
  @Length(30, 30)
  public readonly did: string;
  @ApiModelProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  public readonly programId: number;
  @ApiModelProperty({
    example: [
      {
        attributeId: 1,
        attribute: 'nr_of_children',
        answer: 32,
      },
      {
        attributeId: 2,
        attribute: 'roof_type',
        answer: 0,
      },
    ],
  })
  @IsArray()
  public readonly attributes: PrefilledAnswerDto[];
}
