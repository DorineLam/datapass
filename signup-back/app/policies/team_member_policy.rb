class TeamMemberPolicy < ApplicationPolicy
  def update?
    (record.enrollment.status_validated? || record.enrollment.status_refused?) && user.is_administrator?
  end

  def permitted_attributes
    [
      :family_name,
      :given_name,
      :email,
      :phone_number,
      :job
    ]
  end
end
