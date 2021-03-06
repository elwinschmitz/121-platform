import { DownloadData } from './interfaces/download-data.interface';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUseTags,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { Controller, Get, Body, Post, Param, UseGuards } from '@nestjs/common';
import { ValidationDataService } from './validation-data.service';
import { PrefilledAnswersDto } from './dto/prefilled-answers.dto';
import { ValidationIssueDataDto } from './dto/validation-issue-data.dto';
import { RolesGuard } from '../../roles.guard';
import { Roles } from '../../roles.decorator';
import { UserRole } from '../../user-role.enum';
import { ReferenceIdProgramDto } from './dto/reference-id-program.dto';
import { User } from '../../user/user.decorator';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiUseTags('connection/validation-data')
@Controller('connection/validation-data')
export class ValidationDataController {
  private readonly validationDataService: ValidationDataService;
  public constructor(validationDataService: ValidationDataService) {
    this.validationDataService = validationDataService;
  }

  @ApiOperation({ title: 'PA gets validationData attributes' })
  @ApiResponse({ status: 200, description: 'Attributes received' })
  @ApiImplicitParam({ name: 'programId', required: true, type: 'integer' })
  @Get('/attributes/:programId')
  public async getAttributes(@Param() params): Promise<any[]> {
    return await this.validationDataService.getAttributes(
      Number(params.programId),
    );
  }

  @ApiOperation({ title: 'PA posts prefilled answers to attributes' })
  @ApiResponse({ status: 200, description: 'Prefilled answers sent' })
  @Post('/attributes')
  public async prefilledAnswers(
    @Body() prefilledAnswers: PrefilledAnswersDto,
  ): Promise<any[]> {
    return await this.validationDataService.uploadPrefilledAnswers(
      prefilledAnswers.referenceId,
      prefilledAnswers.programId,
      prefilledAnswers.attributes,
    );
  }

  @Roles(UserRole.FieldValidation)
  @ApiOperation({ title: 'Get prefilled answers (for AW)' })
  @ApiResponse({ status: 200, description: 'Prefilled answers received' })
  @Post('/get-answers')
  public async getPrefilledAnswers(
    @Body() getAnswers: ReferenceIdProgramDto,
  ): Promise<any[]> {
    return await this.validationDataService.getPrefilledAnswers(
      getAnswers.referenceId,
      getAnswers.programId,
    );
  }

  @Roles(UserRole.FieldValidation)
  @ApiOperation({ title: 'Get all prefilled answers (for pre-download)' })
  @ApiResponse({ status: 200, description: 'Prefilled answers downloaded' })
  @Get('/download-data')
  public async getAllPrefilledAnswers(
    @User('id') userId: number,
  ): Promise<DownloadData> {
    return await this.validationDataService.downloadData(userId);
  }

  @Roles(UserRole.FieldValidation)
  @ApiOperation({ title: 'Issue validationData (For AW)' })
  @ApiResponse({ status: 200, description: 'Validation Data issued' })
  @Post('/issue')
  public async issue(
    @Body() validationIssueData: ValidationIssueDataDto,
  ): Promise<void> {
    return await this.validationDataService.issueValidation(
      validationIssueData,
    );
  }
}
