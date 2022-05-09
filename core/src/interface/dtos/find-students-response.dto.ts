class FindStudentsResult {
  readonly id: string;

  readonly name: string;

  readonly surname: string;

  readonly email: string;

  readonly dni: number;

  readonly courses: [any];
}

export class FindStudentsResponseDTO {
  readonly students: FindStudentsResult;
}
