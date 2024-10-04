import { HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';

import * as timezone from 'dayjs/plugin/timezone';
import { cipher } from 'utility/encryption';
dayjs.extend(timezone);

export const GetUserMenu = async (
  headers: any,
  body: any,
  { request }: { request: any },
  connection: any,
) => {
  const { signature, tz } = headers;

  if (!signature || !tz) {
    throw new HttpException('Invalid data', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  const { username } = request;

  const [userProfile] = await connection.query(
    `
      SELECT
        *
      FROM
        ${process.env.DATABASE_CORE}.company_staff cs
        JOIN ${process.env.DATABASE_CORE}.core_users cu ON cs.core_user_id = cu.core_user_id
        JOIN ${process.env.DATABASE_CORE}.core_groups cg ON cg.core_group_id = cs.core_group_id
        JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = cs.company_profile_id
        JOIN ${process.env.DATABASE_CORE}.core_sessions_user csu ON csu.username = cu.username
      WHERE cu.username = ? 
        AND csu.session_can_renew = 1
        AND csu.session_active = 1
      `,
    [username],
  );
  const getSelectedCompany = userProfile?.[0].active_company_profile;

  const [userMenu] = await connection.query(
    `
      SELECT
        *
      FROM
        ${process.env.DATABASE_CORE}.apps_menus am
        JOIN ${process.env.DATABASE_CORE}.core_groups_detail cgd ON am.app_menu_id = cgd.app_menu_id
        JOIN ${process.env.DATABASE_CORE}.core_groups cg ON cg.core_group_id = cgd.core_group_id
        JOIN ${process.env.DATABASE_CORE}.core_access_groups cag ON cag.core_group_id = cg.core_group_id
        JOIN ${process.env.DATABASE_CORE}.core_users cu ON cu.core_user_id = cag.core_user_id
        WHERE cu.username = ? 
      `,
    [username, getSelectedCompany],
  );

  const encrypted = cipher(process.env.SALT);

  const newUserMenu = userMenu.map((item) => {
    const {
      app_menu_id,
      href,
      icon,
      apps_name,
      category_name,
      category_display_name,
      app_menu_name,
      app_menu_display_name,
      is_show,
      expandable,
      order,
      username,
      ref_profiles_id,
      image_url,
    } = item;
    return {
      app_menu_id: encrypted(String(app_menu_id)),
      ref_profiles_id: encrypted(String(ref_profiles_id)),
      href,
      icon,
      apps_name,
      category_name,
      category_display_name,
      app_menu_name,
      app_menu_display_name,
      is_show,
      expandable,
      order,
      username,
      image_url,
    };
  });

  const newUserProfile = userProfile.map((item) => {
    const {
      company_staff_id,
      company_profile_id,
      company_staff_title_start,
      company_staff_name,
      company_staff_title_end,
      core_group_id,
      ref_profiles_id,
      core_group_name,
      company_profile_name,
      image_url,
    } = item;
    if (getSelectedCompany == company_profile_id) {
      return {
        company_staff_id: encrypted(String(company_staff_id)),
        company_profile_id: encrypted(String(company_profile_id)),
        core_group_id: encrypted(String(core_group_id)),
        ref_profiles_id: encrypted(String(ref_profiles_id)),
        company_profile_name,
        core_group_name,
        company_staff_title_start,
        company_staff_name,
        company_staff_title_end,
        image_url,
      };
    }
    return {
      company_profile_id: encrypted(String(company_profile_id)),
      company_profile_name,
    };
  });

  return {
    statusCode: 200,
    message: 'Horay you can access',
    data: { profile: newUserProfile, menu: newUserMenu },
  };
};
