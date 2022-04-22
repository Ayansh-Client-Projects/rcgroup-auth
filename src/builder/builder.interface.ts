export interface Builder<E, D> {
  toEntity(dto: D, authId: string): E;
  toDto(entity: E): D;
}
