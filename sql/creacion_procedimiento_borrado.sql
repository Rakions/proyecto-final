CREATE OR REPLACE PROCEDURE borrar_usuarios_inactivos AS
BEGIN
  DECLARE
    fecha_limite DATE := ADD_MONTHS(SYSDATE, -5);
  BEGIN
    DELETE FROM cafe_users
    WHERE last_connection < fecha_limite;
    IF SQL%ROWCOUNT > 0 THEN
      DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || ' usuarios inactivos eliminados.');
    ELSE
      DBMS_OUTPUT.PUT_LINE('No se encontraron usuarios inactivos.');
    END IF;
  END;
END;
/

BEGIN
  borrar_usuarios_inactivos;
END;
/

