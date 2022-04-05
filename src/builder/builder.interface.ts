export interface Builder<E, D> {
  toEntity(dto: D): E;
  toDto(entity: E): D;
}
