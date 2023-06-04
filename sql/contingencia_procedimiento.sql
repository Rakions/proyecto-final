CREATE OR REPLACE PROCEDURE eliminar_procedimientos AS
BEGIN
  BEGIN
    DBMS_SCHEDULER.DROP_JOB('borrar_usuarios_job');
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Trabajo programado eliminado.');
  EXCEPTION
    WHEN OTHERS THEN
      NULL; 
  END;


  BEGIN
    EXECUTE IMMEDIATE 'DROP PROCEDURE borrar_usuarios_inactivos';
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Procedimiento "borrar_usuarios_inactivos" eliminado.');
  EXCEPTION
    WHEN OTHERS THEN
      NULL; 
  END;

 
  BEGIN
    EXECUTE IMMEDIATE 'DROP PROCEDURE eliminar_procedimientos';
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Procedimiento "eliminar_procedimientos" eliminado.');
  EXCEPTION
    WHEN OTHERS THEN
      NULL; 
  END;
END;
/



