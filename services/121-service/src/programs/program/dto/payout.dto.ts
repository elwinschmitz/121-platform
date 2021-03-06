import { ApiModelProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class PayoutDto {
  @ApiModelProperty({ example: 1 })
  @IsNumber()
  public readonly programId: number;
  @ApiModelProperty({ example: 1 })
  @IsNumber()
  public readonly installment: number;
  @ApiModelProperty({ example: 10 })
  @IsNumber()
  public readonly amount: number;
  @ApiModelProperty({ example: '910c50be-f131-4b53-b06b-6506a40a2734' })
  @Length(29, 36)
  @IsString()
  @IsOptional()
  public readonly referenceId: string;
}

export class TotalIncluded {
  public connections: number;
  public transferAmounts: number;
}
