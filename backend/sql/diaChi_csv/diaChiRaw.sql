use vietnamese_administrative_units;

select count(id) from administrative_regions;
describe administrative_regions;
select * from administrative_regions;
-- ALTER TABLE administrative_regions
    -- ADD `type` VARCHAR(50) default 'ADMINISTRATIVE_REGIONS';


UPDATE administrative_regions
SET `type` = 'ADMINISTRATIVE_REGION';


select count(id) from administrative_units;
describe administrative_units;
select * from administrative_units;
-- ALTER TABLE administrative_units
    -- ADD `type` VARCHAR(50) default 'ADMINISTRATIVE_UNITS';

select count(*) from provinces;
describe provinces;
select * from provinces;
-- ALTER TABLE provinces
    -- ADD `type` VARCHAR(50) default 'PROVINCE';

select count(*) from districts;
describe districts;
select * from districts;
-- ALTER TABLE districts
    -- ADD `type` VARCHAR(50) default 'DISTRICT';


select count(*) from wards;
describe wards;
select * from wards;
-- ALTER TABLE wards
    -- ADD `type` VARCHAR(50) default 'WARD';