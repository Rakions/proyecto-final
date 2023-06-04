BEGIN
  DBMS_SCHEDULER.CREATE_JOB(
    job_name        => 'borrar_usuarios_job',
    job_type        => 'PLSQL_BLOCK',
    job_action      => 'BEGIN borrar_usuarios_inactivos; END;',
    start_date      => SYSTIMESTAMP,
    repeat_interval => 'FREQ=MONTHLY',
    enabled         => TRUE
  );

  COMMIT;
END;
/



